import React from 'react'

const EditUser = () => {
    return (
        <>
            <form action="">
                <div class="inputBox">
                    <input type="text" placeholder="name" />
                    <input type="number" placeholder="number" />
                </div>
                <div class="inputBox">
                    <input type="email" placeholder="email" />
                    <input type="text" placeholder="subject" />
                </div>
                <textarea name="" placeholder="message" id="" cols="30" rows="10"></textarea>
                <input type="submit" value="send message" class="btn" />
            </form>
        </>
    )
}

export default EditUser
