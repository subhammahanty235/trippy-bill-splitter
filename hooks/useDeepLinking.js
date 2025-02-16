// useDeepLinking.js (custom hook)
import { useEffect } from 'react';
import { Linking } from 'react-native';

const useDeepLinking = (handleDeepLink) => {
  useEffect(() => {
    // Listen for deep links
    Linking.addEventListener('url', handleDeepLink);

    // Check if the app was opened via a deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    // Clean up listener
    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, [handleDeepLink]);
};

export default useDeepLinking;
