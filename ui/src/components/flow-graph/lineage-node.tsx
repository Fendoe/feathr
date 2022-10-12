import React, { forwardRef, memo } from "react";
import cs from "classnames";
import { RightCircleOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { LineageNodeProps } from "./interface";

import styles from "./index.module.less";

type Params = {
  project: string;
};

function LineageNode(props: LineageNodeProps, ref: any) {
  const navigate = useNavigate();
  const { project } = useParams<Params>();

  const { label, subtitle, featureId, version, borderColor, active } =
    props.data;

  const nodeTitle = version ? `${label} (v${version})` : label;
  const nodeSubtitle = subtitle.replace("feathr_", "");
  const nodeColorStyle = {
    border: `2px solid ${borderColor}`,
  };

  const onNodeIconClick = () => {
    navigate(`/projects/${project}/features/${featureId}`);
  };

  return (
    <div
      ref={ref}
      style={active ? undefined : nodeColorStyle}
      className={cs(styles.lineageNode, { [styles.lineageNodeActive]: active })}
    >
      <div className={styles.box}>
        <Handle type="target" position={Position.Left} />
        <div className={styles.title}>
          {nodeTitle}
          {active && (
            <RightCircleOutlined
              className={styles.navigate}
              onClick={onNodeIconClick}
            />
          )}
          <div className={styles.subtitle}>{nodeSubtitle}</div>
        </div>
        <Handle type="source" position={Position.Right} />
      </div>
    </div>
  );
}

const LineageNodeComponent = forwardRef<unknown, NodeProps>(LineageNode);

LineageNodeComponent.displayName = "LineageNode";

export default memo(LineageNodeComponent);
