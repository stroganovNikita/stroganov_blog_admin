import Nav from "../partials/Nav/Nav";
import classes from './error.module.css';
function Error() {
  return (
    <>
      <Nav />
      <h2 className={classes.errorHeader}>Page Not Found</h2>
    </>
  );
}

export default Error;
