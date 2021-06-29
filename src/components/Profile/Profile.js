import React, { useState } from 'react';
import './Profile.css'

function Profile({ user, toggleModal, loadUser }) {
    const [name, setName] = useState(user.name);
    const [userAge, setUserAge] = useState(user.age);
    const [userPet, setUserPet] = useState(user.pet);

    let data = {
        name: name,
        age: userAge,
        pet: userPet
    };

    function onProfileChange() {
        fetch(`http://localhost:8000/profile/${user.id}`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({ formInput: data })
        })
        .then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                toggleModal();
                loadUser({ ...user, ...data });
            }
        })
        .catch(err => console.log(err)) 
    }

    return (
        <div className="profile-modal">
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                <main className="pa4 black-80 w-80">
                    <img
                        src="http://tachyons.io/img/logo.jpg"
                        className="pa1 h3 w3 dib" alt="avatar" />
                    <h1>{name}</h1>
                    <h4>Images Submitted: {user.entries}</h4>
                    <p>Member since: {new Date(user.joined).toLocaleDateString()}</p>
                    <div className="measure">
                        <div className="mt3">
                            <label className="fw6" htmlFor="name">user-name</label>
                            <input
                                className="pa2 ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mt3">
                        <label className="fw6" htmlFor="age">age</label>
                            <input
                                className="pa2 ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                                type="text"
                                name="age"
                                id="age"
                                value={userAge}
                                onChange={(e) => setUserAge(e.target.value)}
                            />
                        </div>
                        <div className="mv3">
                        <label className="fw6" htmlFor="pet">pet</label>
                            <input
                                className="pa2 ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                                type="text"
                                name="pet"
                                value={userPet}
                                id="pet"
                                onChange={(e) => setUserPet(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                        <button onClick={() => onProfileChange()} className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20">
                            Save
                        </button>
                        <button onClick={toggleModal} className="b pa2 grow pointer hover-white w-40 bg-pink b--black-20">
                            Cancel
                        </button>
                    </div>
                </main>
                <div className="modal-close" onClick={toggleModal}>&times;</div>
            </article>
        </div>
    )
};

export default Profile;