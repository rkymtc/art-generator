export type RootStackParamList = {
  Home: undefined;
  LogoGenerator: undefined;
  LogoDetails: { taskId: string };
  Settings: undefined;
};

export interface AppNavigatorProps {
  initialRouteName?: keyof RootStackParamList;
}

export interface InputScreenProps {
  navigation: any;
}

export interface OutputScreenProps {
  navigation: any;
  route: any;
} 