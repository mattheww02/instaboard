import Board from "../components/Board";
import ChatBox from "../components/ChatBox";
import ColorPicker from "../components/ColorPicker";

const BoardPage: React.FC = () => {
  return (
    <div>
      <div className="container px-5">
        <div className="row">
          <div className="col-md-8">
            <Board />
          </div>
          <div className="col-md-4 d-flex">
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
