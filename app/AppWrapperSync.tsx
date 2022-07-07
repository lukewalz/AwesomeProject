import React from 'react';
import {AppProvider, createRealmContext, UserProvider} from '@realm/react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {LoginScreen} from './components/LoginScreen';
import colors from './styles/colors';
import {AppSync} from './AppSync';

export const AppWrapperSync: React.FC<{
  appId: string;
}> = ({appId}) => {
  const userSchema = {
    name: 'user',
    properties: {
      _id: 'objectId',
      account_type: 'int?',
      address: 'string?',
      auth_id: 'string',
      city: 'string?',
      creation_date: 'date?',
      email: 'string?',
      first_name: 'string?',
      hours: 'int?',
      last_name: 'string?',
      notification_keys: 'string[]',
      phone: 'string?',
      plan: 'int?',
      profile_image: 'string?',
      rides: 'ride[]',
      state: 'string?',
      zip: 'string?',
    },
    primaryKey: '_id',
  };

  const rideSchema = {
    name: 'ride',
    properties: {
      _id: 'objectId?',
      date_completed: 'date?',
      date_created: 'date?',
      date_requested: 'date?',
      duration: 'double?',
      locations: 'string[]',
      notes: 'string?',
      passengers: 'int?',
      service: 'string?',
      status: 'int?',
      tip: 'double?',
    },
    primaryKey: '_id',
  };

  const config = {
    schema: [userSchema, rideSchema],
  };

  const {RealmProvider} = createRealmContext(config);

  const syncConfig = {
    partitionValue: null as any,
  };

  // If we are logged in, add the sync configuration the the RealmProvider and render the app
  return (
    <SafeAreaView style={styles.screen}>
      <AppProvider id={appId}>
        <UserProvider fallback={LoginScreen}>
          <RealmProvider sync={syncConfig}>
            <AppSync />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});

export default AppWrapperSync;
