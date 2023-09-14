import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { supabaseClient } from '@/lib/supabase';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Session } from '@supabase/supabase-js';

import { AuthProvider } from '../context/AuthProvider';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontLoaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const [sessionLoadAttempted, setSessionLoadAttempted] = useState(false);
  const [initialSession, setInitialSession] = useState<Session | null>(null);

  useEffect(() => {
    supabaseClient.auth
      .getSession()
      .then(({ data }) => {
        if (data) {
          setInitialSession(data.session);
        }
      })
      .finally(() => {
        setSessionLoadAttempted(true);
      });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded && sessionLoadAttempted) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, sessionLoadAttempted]);

  if (!fontLoaded || !sessionLoadAttempted) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AuthProvider initialSession={initialSession}>
        <Slot />
      </AuthProvider>
    </View>
  );
}
