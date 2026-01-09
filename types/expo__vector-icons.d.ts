declare module '@expo/vector-icons' {
  import * as React from 'react';
  import {TextProps} from 'react-native';

  export interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  export class Ionicons extends React.Component<IconProps> {
    static glyphMap: Record<string, number>;
  }
}
