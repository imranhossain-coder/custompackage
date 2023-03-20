import { registerRootComponent } from "expo";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";
const AppComponent = () => (
  <QueryClientProvider client={new QueryClient()}>
    <App />
  </QueryClientProvider>
);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// AppRegistry.registerComponent('main', () => AppComponent)
registerRootComponent(AppComponent);
