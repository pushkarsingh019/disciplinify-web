import { useStoreState } from "easy-peasy";

export default function HomeScreen() {
  const userDetails = useStoreState((state) => state.userData);
  const show = Object.keys(userDetails).length === 0;
  console.log(userDetails);
  console.log(show);
  return show ? (
    "there is nothing here"
  ) : (
    <p>
      <h1>Hey, {userDetails.name}</h1>
    </p>
  );
}
