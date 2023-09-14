import { Link, Navigator, Slot, Tabs } from 'expo-router';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

export default function Layout() {
  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1 }}>
        <Navigator>
          <CustomTabBar />
          <Slot />
        </Navigator>
      </View>
    );
  }

  return (
    <Tabs>
      <Tabs.Screen name="home/index" options={{ title: 'Home' }} />
      <Tabs.Screen name="settings/index" options={{ title: 'Settings' }} />
    </Tabs>
  );
}

function CustomTabBar() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#C4B5FD',
        padding: 16,
      }}
    >
      <Link href="/" style={[styles.link]}>
        ExpoWeb
      </Link>

      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TabLink
          // `name` is used to determine if the tab is selected.
          name="home/index"
          href="/home"
        >
          {({ focused }) => (
            <Text style={[styles.link, { opacity: focused ? 1 : 0.5 }]}>
              Home
            </Text>
          )}
        </TabLink>

        <TabLink name="settings/index" href="/settings">
          {({ focused }) => (
            <Text style={[styles.link, { opacity: focused ? 1 : 0.5 }]}>
              Settings
            </Text>
          )}
        </TabLink>
      </View>
    </View>
  );
}

function useIsTabSelected(name: string): boolean {
  const { state } = Navigator.useContext();
  const current = state.routes.find((route, i) => state.index === i);
  return current?.name === name;
}

function TabLink({
  children,
  name,
  href,
  style,
}: {
  children?: (props: { focused: boolean }) => JSX.Element;
  name: string;
  href: string;
  style?: ViewStyle;
}) {
  const focused: boolean = useIsTabSelected(name);
  return (
    <Link href={href} asChild style={style}>
      <Pressable>{(props) => children?.({ ...props, focused })}</Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: 24,
  },
});
