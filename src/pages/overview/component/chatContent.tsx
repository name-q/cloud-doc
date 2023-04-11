import React from "react";

import { connect } from "react-redux";
import { store2Props } from "../redux-item/selectors";
import actions from "../redux-item/actions";
import { reduxIProps } from "../redux-item/types";

import { Skeleton } from "antd";

const ChatContent: React.FC<reduxIProps> = (props) => (
  <>
    <div className="chat-container">
      <div className="chat-bubble" style={{ width: "70%" }}>
        <Skeleton active />
      </div>
      <div className="chat-bubble right" style={{ width: "85%" }}>
        <Skeleton active />
      </div>
      <div className="chat-bubble" style={{ width: "70%" }}>
        <Skeleton active />
      </div>
      <div className="chat-bubble right" style={{ width: "85%" }}>
        <Skeleton active />
      </div>
      <div className="chat-bubble" style={{ width: "70%" }}>
        <Skeleton active />
      </div>
      <div className="chat-bubble right" style={{ width: "85%" }}>
        <Skeleton active />
      </div>
    </div>
    {/* <div className="chat-container">
      <div className="chat-bubble">
        <p>你认为人工智能会取代人类吗？</p>
      </div>
      <div className="chat-bubble right">
        <p>
          人工智能可以在某些方面取代人类，但在许多其他方面，人类具有独特的能力和优势，这些优势很难被机器取代。
        </p>
      </div>

      <div className="chat-bubble">
        <p>如何学习新的技能？</p>
      </div>
      <div className="chat-bubble right">
        <p>
          学习新技能需要时间和努力。可以通过参加培训课程、阅读书籍、观看视频、与其他人交流和实践等方式学习。
        </p>
      </div>

      <div className="chat-bubble">
        <p>你认为人类未来会怎样？</p>
      </div>
      <div className="chat-bubble right">
        <p>
          未来是不可预测的，但是随着技术和社会的不断发展，人类可能会面临一些新的挑战和机遇。
        </p>
      </div>
    </div> */}
  </>
);

export default connect(store2Props, actions)(ChatContent);
