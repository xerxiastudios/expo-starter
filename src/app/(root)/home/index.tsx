import { Link, Slot } from 'expo-router';
import { Text, View } from 'react-native';

import { supabaseClient } from '@/lib/supabase';

async function signUpWithEmail() {
  const { error } = await supabaseClient.auth.signOut();
}

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={signUpWithEmail}>Sign Out</Text>
    </View>
  );
}
