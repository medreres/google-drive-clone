import React from "react";
import { Stack } from "react-bootstrap";
import Navbar from "./Navbar";
import notFoundImg from "../assets/not-found.png";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <Stack
        style={{
          maxWidth: "50vw",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "8%",
        }}>
        <div className="text-center">
          <img
            src={notFoundImg}
            alt="not found"
          />
        </div>
        <a href="/">
          <span className="btn btn-primary w-100 mt-5">Go Home</span>
        </a>
      </Stack>
    </>
  );
}
