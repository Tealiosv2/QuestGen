import { doSignOut } from "../../../firebase/auth";

function NavBar({ StageMessages }) {
  // Import stage data

  const handleSignOut = () => {
    doSignOut();
  };
  return (
    <>
      <button>Export</button>
      <button>Import</button>
      <button onClick={handleSignOut}>Log Out</button>
    </>
  );
}

export default NavBar;
