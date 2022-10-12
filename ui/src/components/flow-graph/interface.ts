import { FeatureLineage } from "@/models/model";
import { FeatureType } from "@/utils/utils";
import { Node, NodeProps, ReactFlowProps } from "react-flow-renderer";

export interface NodeData {
  id: string;
  label: string;
  subtitle: string;
  featureId: string;
  version: string;
  borderColor?: string;
  active?: boolean;
}

export interface FlowGraphProps {
  data?: FeatureLineage;
  nodeId?: string;
  snapGrid?: ReactFlowProps["snapGrid"];
  featureType?: FeatureType;
}

export interface LineageNodeProps extends NodeProps<NodeData> {}
