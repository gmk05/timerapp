import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
    target="_blank"
    {...rest}
    href={href as any}
    onPress={async (event) => {
      console.log('Platform:', Platform.OS);
      if (Platform.OS !== 'web') {
        if (event.preventDefault) {
          event.preventDefault();
        }
        console.log('Opening browser with URL:', href);
        await openBrowserAsync(href);
      }
    }}
  />
);
}