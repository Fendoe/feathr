import React, { useEffect, useState } from "react";
import { Card, Col, Radio, Row, Spin, Tabs, Typography } from "antd";
import { useParams, useSearchParams } from "react-router-dom";
import FlowGraph from "@/components/flow-graph";
import { fetchProjectLineages } from "../../api";
import { FeatureLineage } from "../../models/model";
import { LoadingOutlined } from "@ant-design/icons";
import GraphNodeDetails from "../../components/graph/graphNodeDetails";
import { FeatureType } from "../../utils/utils";

const { Title } = Typography;
const { TabPane } = Tabs;

type Params = {
  project: string;
};
const LineageGraph = () => {
  const { project } = useParams() as Params;
  const [searchParams] = useSearchParams();
  const nodeId = searchParams.get("nodeId") as string;

  const [lineageData, setLineageData] = useState<FeatureLineage>({
    guidEntityMap: {},
    relations: [],
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [featureType, setFeatureType] = useState<FeatureType>(
    FeatureType.AllNodes
  );

  // Fetch lineage data from server side, invoked immediately after component is mounted
  useEffect(() => {
    const fetchLineageData = async () => {
      setLoading(true);
      const data = await fetchProjectLineages(project);
      setLineageData(data);
      setLoading(false);
    };

    fetchLineageData();
  }, [project]);

  const toggleFeatureType = (type: FeatureType) => {
    setFeatureType(type);
  };

  return (
    <div className="page">
      <Card>
        <Title level={3}>Lineage {project}</Title>
        <div>
          <Radio.Group
            value={featureType}
            onChange={(e) => toggleFeatureType(e.target.value)}
          >
            <Radio.Button value={FeatureType.AllNodes}>All Nodes</Radio.Button>
            <Radio.Button value={FeatureType.Source}> Source </Radio.Button>
            {/* <Radio.Button value={FeatureType.Anchor}>Anchor</Radio.Button> */}
            <Radio.Button value={FeatureType.AnchorFeature}>
              Anchor Feature
            </Radio.Button>
            <Radio.Button value={FeatureType.DerivedFeature}>
              Derived Feature
            </Radio.Button>
          </Radio.Group>
        </div>
        <div>
          {loading ? (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          ) : (
            <Row>
              <Col flex="2">
                <FlowGraph
                  data={lineageData}
                  nodeId={nodeId}
                  featureType={featureType}
                />
              </Col>
              <Col flex="1">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Metadata" key="1">
                    <GraphNodeDetails></GraphNodeDetails>
                  </TabPane>
                  <TabPane tab="Metrics" key="2">
                    <p>Under construction</p>
                  </TabPane>
                  <TabPane tab="Jobs" key="3">
                    <p>Under construction</p>
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LineageGraph;
