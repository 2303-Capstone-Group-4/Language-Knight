import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import QuizPopup from "./QuizPopup";
import UserInfo from "./UserInfo";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { setPosition } from "../store/store";
import Tier1Info from "./Tier1Info.js";
import Tier2Info from "./Tier2Info.js";
import Tier3Info from "./Tier3Info.js";
import { setInfo1, setInfo2, setInfo3 } from "../store";

const GameBoard = () => {
  const dispatch = useDispatch();

  const { language, position, character } = useSelector(
    (state) => state.reduxStore
  );

  let imgsrc = "";
  if (character === "char1") {
    imgsrc = "./images/20230907_180304.jpg";
  } else if (character === "char2") {
    imgsrc = "./images/20230907_180322.jpg";
  } else if (character === "char3") {
    imgsrc = "./images/20230907_180337.jpg";
  } else if (character === "char4") {
    imgsrc = "./images/20230907_180348.jpg";
  }

  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState(3);

  const spaces = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const onKeyDown = (ev) => {
    if (ev.code === "ArrowLeft") {
      if (position > 0) {
        dispatch(setPosition(position - 1));
      }
    }
    if (ev.code === "ArrowRight") {
      if (position < 9) {
        dispatch(setPosition(position + 1));
      }
    }
  };

  useEffect(() => {
    dispatch(setInfo1(language));
    setLoading(false);
  }, []);

  useEffect(() => {
    dispatch(setInfo2(language));
  }, []);

  useEffect(() => {
    dispatch(setInfo3(language));
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  //add state (true or false) if user is on position, render popup

  const gameItems = spaces.map((space) => (
    <TableCell id="board" key={space} onClick={() => console.log(space)}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "100px",
        }}
      >
        {space === position ? (
          <img
            src={imgsrc}
            alt={""}
            style={{
              width: "100%",
              justifyContent: "center",
              borderRadius: "15px",
              boxShadow: "5px 5px 5px black",
            }}
          />
        ) : (
          <Button
            variant="outlined"
            sx={{
              justifyContent: "center",
              borderRadius: "15px",
              background: "white",
              borderColor: "black",
              borderWidth: "3px",
              color: "black",
              fontWeight: "bold",
            }}
          >
            {space}
          </Button>
        )}

        {space === 2 && position === 2 ? (
          <modal>
            <Tier1Info />
          </modal>
        ) : (
          <p></p>
        )}

        {space === 5 && position === 5 ? (
          <modal>
            <Tier2Info />
          </modal>
        ) : (
          <p></p>
        )}

        {space === 8 && position === 8 ? (
          <modal>
            <Tier3Info />
          </modal>
        ) : (
          <p></p>
        )}
      </Box>
    </TableCell>
  ));

  return (
    <div id="gameboard">
      {/* <UserInfo health={health} /> */}
      <h2 id="language">Language: {language}</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>{gameItems}</TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <hr />
      {/* {position === 4 ? <QuizPopup /> : <div />} */}
    </div>
  );
};

export default GameBoard;
