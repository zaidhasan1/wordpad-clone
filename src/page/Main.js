import { Grid } from "@mui/material";
import Editor from "./Editor";

import "./css/editor.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import SideBar from "./sidebar/SideBar";

const Main = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-xl-3">
            <SideBar />
          </div>
          <div className="col-xl-9">
            <br />
            <br />
            <Editor id="editor" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
