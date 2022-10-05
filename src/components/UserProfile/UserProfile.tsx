import UserProfileForm from "../UserProfileForm/UserProfileForm"
import classes from './UserProfile.module.css';

const UserProfile = () => {
    return (
        <section className={classes.profile}>
            <h1>Your User Profile</h1>
            <UserProfileForm />
        </section>
    );
};

export default UserProfile;