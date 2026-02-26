import { View } from 'react-native';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import { Home } from './pages/Home';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export function App() {
  
  const [ loaded, error ] = useFonts({
    InterRegular: Inter_400Regular,
    InterBold: Inter_700Bold,
  })

  useEffect( () => {
    if ( loaded || error ) {
      SplashScreen.hide();
    }
  }, [loaded, error] )

  if ( !loaded && !error ) return
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Home />
    </View>
  );
}
