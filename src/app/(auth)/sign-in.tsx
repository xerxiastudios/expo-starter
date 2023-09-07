import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { supabaseClient } from '@/lib/supabase';

export default function Screen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
      <Stack.Screen
        options={{
          title: 'Sign In',
        }}
      />
      <SignIn />
    </SafeAreaView>
  );
}

async function signUpWithEmail() {
  const { error } = await supabaseClient.auth.signInWithPassword({
    email: 'a@b.com',
    password: 'Admin@123',
  });
}

function SignIn() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={signUpWithEmail}>Sign In</Text>
    </View>
  );
}
