import { Component, ReactNode } from "react";
import { TopicBoard } from "./TopicBoard";
import nodes from "../../config/moduleConfig";
import { Header } from "./Header";
import { Topic } from "./Topic";

interface IBoardContentProps {
  onlineNodes: string[];
}

export class BoardContent extends Component<IBoardContentProps> {
  render(): ReactNode {
    const { onlineNodes } = this.props;
    return (
      <TopicBoard>
        <Header title={"Nodes"} />
        {nodes.map((_, idx) => {
          return (
            <Topic
              key={idx}
              name={_}
              topicState={
                onlineNodes.indexOf(_) >= 0 ? "good_standing" : "not_found"
              }
            />
          );
        })}
      </TopicBoard>
    );
  }
}
