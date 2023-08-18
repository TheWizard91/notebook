class User {
    constructor (
        firstname,
        lastname,
        email,
        password,
        temporary_user_id,
        profile_image_uri,
        permanent_user_id) {

            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
            this.password =password;
            this.temporary_user_id = temporary_user_id;
            this.permanent_user_id = ""//permanent_user_id;
            this.profile_image_uri = "https://firebasestorage.googleapis.com/v0/b/thejournal-d14eb.appspot.com/o/storage_of_me%2Fprofile_images%2F1e87a7f1-aced-4dce-a853-fb163ef52b24.jpg?alt=media&token=0bdb1342-01a9-467e-964b-2007ab2dccbc"//profile_image_uri;
    }
    
    toString () {
        return this.firstname + ", " + this.lastname + ", " + this.email + ", "
        + this.password + ", " + this.temporary_user_id + ", " + this.profile_image_uri + ", "
        + this.permanent_user_id;
    }
}
export default User