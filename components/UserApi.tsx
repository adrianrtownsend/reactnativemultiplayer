import { database } from "../firebase";

/** Static utility functions for fetching user metadata. */

interface usersArray {
  [uid: string]: string;
  name: string;
};

export default class UserApi {

  /** Returns true if the given user UID exists in memory. */
  static hasUid(uid: usersArray) {
    return ({users: users}) === null || uid in ({users: users});
  }

  /** Returns the user's display name or null if it does not exist. */
  static getName(uid: usersArray) {
    if (UserApi.hasUid(uid)) {
      return users[uid].name;
    } else {
      console.warn("No user metadata found for UID", uid);
      return null;
    }
  }

  /** Returns the user's photo URL or null if it does not exist. */
  static getPhotoUrl(uid: usersArray) {
    if (UserApi.hasUid(uid)) {
      return users[uid].photoURL;
    } else {
      console.warn("No user metadata found for UID", uid);
      return null;
    }
  }

  /** Returns the user's last login date or null if it does not exist. */
  static getLastSignIn(uid: usersArray) {
    if (UserApi.hasUid(uid)) {
      return new Date(users[uid].lastSignIn);
    } else {
      console.warn("No user metadata found for UID", uid);
      return null;
    }
  }
}


var users: { (arg0: boolean): any;[x: string]: { lastSignIn: string | number | Date; }; } | null = null; // In-memory cache of all user metadata.

export class UserApiConfig {
  static startListeningForChanges() {
    // Some browser-based IDEs cleverly reload the app without destroying the
    // in-memory cache. Clear it before listening to Firebase changes to ensure
    // Promise.resolve() is called.
    users = null;

    var usersDatabaseRef = database.ref("/user");
    // Returns a Promise that resolves whenever the first load completes.
    return new Promise<void>((resolve) => {
      usersDatabaseRef.on("value", (snapshot) => {
        if (users === null) {
          resolve();
        }

        if (snapshot.val() === null) {
          users = {};
        } else {
          users = snapshot.val();
        }
      })
    });
  }

  static stopListeningForChanges() {
    database.ref("/user").off();
  }
}