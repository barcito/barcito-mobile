import '@rneui/themed';

declare module '@rneui/themed' {
  export interface Colors {
    backgroundVariant: string,
    primaryVariant: string,
    secondaryVariant: string,
    surface: string,
    onPrimary: string,
    onSecondary: string,
    onBackground: string,
    onSurface: string,
    onError: string
  }
}