import { useStoreState } from "easy-peasy";

export default function HomeScreen() {
  const userDetails = useStoreState((state) => state.userData);
  const dontShow = Object.keys(userDetails).length === 0;
  return dontShow ? "there is nothing here" : <h1>Hey, {userDetails.name}</h1>;
}
