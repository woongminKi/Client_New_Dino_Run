import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { MAIN_COLOR_1, WHITE, BLACK } from "../../utils/color";

export default function RoomModal({ isMade, isClosed, children }) {
  return (
    <>
      <Dimmed onClick={isClosed} />
      <ModalWrapper>
        <ModalForm>{children}</ModalForm>
        <Button className="real-create" onClick={isMade}>
          레알 만들기
        </Button>
        <Button className="cancel" onClick={isClosed}>
          취소
        </Button>
      </ModalWrapper>
    </>
  );
}

RoomModal.propTypes = {
  isMade: PropTypes.func,
  isClosed: PropTypes.func,
  children: PropTypes.node,
};

const Dimmed = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0%;
  top: 0%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.div`
  top: 50%;
  left: 50%;
  width: 360px;
  height: 220px;
  position: absolute;
  margin-left: -180px;
  margin-top: -110px;
  text-align: center;
  border-radius: 0.5rem;
  background-color: white;

  .real-create:hover {
    color: ${MAIN_COLOR_1};
  }
  .cancel: hover {
    color: ${MAIN_COLOR_1};
  }
`;

const ModalForm = styled.div`
  color: ${BLACK};
  margin-top: 50px;
  margin-bottom: 45px;
  font-size: 1.4rem;
  font-weight: 100;
`;

const Button = styled.button`
  margin: 0 30px 0 20px;
  padding: 10px 15px 10px 15px;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-color: gray;
  text-align: center;
  background-color: ${WHITE};
`;
