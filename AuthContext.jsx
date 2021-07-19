import React, { useEffect, useReducer, useContext, createContext, useMemo } from "react";
import * as SecureStore from 'expo-secure-store';
import { auth, database } from './firebase';
import firebase from 'firebase';
import gameData from "./components/GameData";

const SESSION_DATA_PATH = "/session";
const SESSION_METADATA_PATH = "/session-metadata";

export const AuthContext = createContext();

const provider = new firebase.auth.GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'LOG_IN_EMAIL':
          return auth.signInWithEmailAndPassword(action.email, action.password);
        case 'LOG_IN_GOOGLE':
          return auth.signInWithRedirect(provider);
        case 'SIGN_UP_EMAIL':
          return (
            auth.createUserWithEmailAndPassword(action.email, action.password)
            .then(userCredentials => console.log('user creds: ', userCredentials))
            .catch(err => console.error('Error signing up: ', err))
          );
        case 'SIGN_OUT':
          return auth.signOut();
        case 'AUTH_STATE_CHANGE':
          console.log('action obj is: ', action);
          return ({
          ...prevState,
          loading: false,
          user: action.user
          });
        case 'IS_LOADED':
          return ({
            ...prevState,
            loading: false
          });
        case 'DB_GET_GAME_DATABASE_REF':
          return database.ref(SESSION_DATA_PATH).child(dispatch({type:'DB_GET_GAME_ID'}));
        case 'DB_GET_GAME_METADATA_DATABASE_REF':
          return database.ref(SESSION_METADATA_PATH).child(dispatch({type:'DB_GET_GAME_ID'}));
        case 'DB_GET_GAME_ID':
          return new Promise((resolve, reject) => {
            ('') ? resolve('') : ('') ? resolve('') : reject('Unable to get game ID from URL nor brower history')
          });
        case 'DB_GET_MY_USER_ID':
          return new Promise((resolve, reject) => {
            (auth && auth.currentUser && auth.currentUser.uid) ? resolve(auth.currentUser.uid) : reject('')
          });          
        case 'DB_USE_GAME_DATA':
          () => {
            const [data, setData] = useState({});
            const id = () => dispatch({type:'DB_GET_GAME_ID'});
            useEffect(() => {
              const onValueChange = snapshot => {
                const data = snapshot.val();
                if(data !== null) {
                  setData(data);
                }
              };
              const ref = () => dispatch({type: 'DB_GET_GAME_DATABASE_REF'});
              ref.on('value', onValueChange);
              return () => { ref.off('value', onValueChange)};
            },[id]);
            return data;
          };
        case 'USE_GAME_USER_IDS':
          () => {
            let defaultUserIds = [];
            /*
            if (this.props &&
                this.props.location &&
                this.props.location.state &&
                this.props.location.state.users) {
              defaultUserIds = this.props.location.state.users;
            }
            */
            const [userIds, setUserIds] = useState(defaultUserIds);
            const id = this.getGameId();
            useEffect(() => {
              const onValueChange = snapshot => {
                const users = snapshot.val();
                if (users !== null) {
                  setUserIds(users);
                }
              };
              const ref = dispatch({type:'DB_GET_GAME_METADATA_DATABASE_REF'}).child('users');
              ref.on('value', onValueChange);
              return () => { ref.off('value', onValueChange) };
            }, [id]);
            return userIds;
          };
        case 'DB_USE_GAME_CREATOR_USER_ID':
          () => {
            let defaultCreatorUserId = "";
            /*
            if (this.props &&
                this.props.location &&
                this.props.location.state &&
                this.props.location.state.creator) {
              defaultCreatorUserId = this.props.location.state.creator;
            }
            */
            const [creatorUserId, setCreatorUserId] = useState(defaultCreatorUserId);
            const id = () => dispatch({type:'DB_GET_GAME_ID'});
            useEffect(() => {
              const onValueChange = snapshot => {
                const creatorUserId = snapshot.val();
                if (creatorUserId !== null) {
                  setCreatorUserId(creatorUserId);
                }
              };
              const ref = dispatch({}).child('creator');
              ref.on('value', onValueChange);
              return () => { ref.off('value', onValueChange) }
            },[id]);
            return CreatorUserId;
          };
        case 'DB_USE_GAME_TITLE':
          () => {
            let defaultTitle = 'React Multiplayer Games';
            /* 
            if (this.props &&
                this.props.location &&
                this.props.location.state &&
                this.props.location.state.title) {
              defaultTitle = this.props.location.state.title;
            }
            */
            const [title, setTitle] = useState(defaultTitle);
            const id = () => dispatch({type:'DB_GET_GAME_ID'});
            useEffect(() => {
              const onValueChange = snapshot => {
                const type = snapshot.val();
                if( type !== null && type in gameData) {
                  setTitle(gameData[type].title);
                }
              };
              const ref = () => dispatch({type:'DB_GET_GAME_METADATA_DATABASE_REF'}).child('type');
              ref.on('value', onValueChange);
              return () => { ref.off('value', onValueChange) };
            }, [id]);
            return title;
          };
        case 'DB_SET_GAME_DATA':
          () => {
            dispatch({type: 'DB_GET_GAME_DATA_DATABASE_REF'}).update(action.data).catch(err => console.warn('Error updating game data', dispatch({type:'DB_GET_GAME_ID'}), ersr))
          };
        case 'DB_SET_GAME_METADATA':
          () => {
            dispatch({type: 'DB_GET_GAME_METADATA_DATABASE_REF'}).update(action.data).catch(err => console.warn('Error updating game metadata', dispatch({type:'DB_GET_GAME_ID'}), err))
          };
      };
    },
    {
      loading: true,
      isSignout: false,
      user: null,
    }
  );

  // SWITCH STUFF TO RETURN PROMISES!!!

  useEffect(() => {
    dispatch({type: 'IS_LOADED'});
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch({ 
        type: 'AUTH_STATE_CHANGE', 
        user
      });
    });
    return unsubscribe;
  },[]);

  const authContext = useMemo(() => ({
    logInEmail: async (data) => {
      dispatch({ 
        type: 'LOG_IN_EMAIL', 
        email: data.email, 
        password: data.password   
      });
    },
    logInGoogle: () => dispatch({ type: 'LOG_IN_GOOGLE'}),
    signUpEmail: async (data) => {
      dispatch({ 
        type: 'SIGN_UP_EMAIL', 
        email: data.email, 
        password: data.password, 
        confirmPassword: data.confirmPassword
      });
    },
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
  }),[]);

  const dbContext = useMemo(() => ({
    getDatabaseRef: () => dispatch({type: 'DB_GET_DATABASE_REF'}),
    getGameMetadataDatabaseRef: () => dispatch({type: 'DB_GET_METADATA_DATABASE_REF'}),
    getGameId: () => dispatch({type: 'DB_GET_GAME_ID'}),
    getMyUserId: () => dispatch({type: 'DB_GET_MY_USER_ID'}),
    useGameData: () => dispatch({type: 'DB_USE_GAME_DATA'}),
    useGameUserIds: () => dispatch({type: 'DB_USE_GAME_USER_IDS'}),
    useGameCreatorUserIds: () => dispatch({type: 'DB_USE_GAME_CREATOR_USER_IDS'}),
    useGameTitle: () => dispatch({type: 'DB_USE_GAME_TITLE'}),
    setGameData: () => dispatch({type: 'DB_SET_GAME_DATA'}),
    setGameMetadata: () => dispatch({type: 'DB_SET_GAME_META_DATA'})
  }),[]);

  const value = {
    authContext,
    dbContext,
    state
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

};