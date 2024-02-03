import { useSelector } from "react-redux";

const HomePage = () => {
  const { user } = useSelector((state) => state.profile);
  return <div>{user.username ? user.username : "vergaaaaaaaaaaa"}</div>;
};

export { HomePage };
