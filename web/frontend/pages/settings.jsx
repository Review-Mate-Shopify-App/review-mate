import { Layout, Card, Page, Text, ChoiceList, Button } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useCallback, useState } from "react";

export default function Settings() {
  const [selected, setSelected] = useState([5]);

  const handleChange = useCallback((value) => setSelected(value), []);

  return (
    <Page fullWidth>
      {" "}
      <TitleBar title={"Settings"} />
      <Layout>
        <Layout.Section>
          <Card>
            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div>
                <div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <input type={"checkbox"}></input>
                    <Text variant="headingMd">Auto Publish</Text>
                  </div>
                  <Text variant="bodySm">
                    Reviews will be published immediately
                  </Text>
                </div>
                <ChoiceList
                  choices={[
                    { label: "5 Stars", value: 5 },
                    { label: "4 Stars", value: 4 },
                    { label: "3 Stars", value: 3 },
                    { label: "2 Stars", value: 2 },
                    { label: "1 Star", value: 1 },
                  ]}
                  selected={selected}
                  onChange={handleChange}
                />
                <Text variant="bodySm">
                  Autopublish reviews with selected rating or higher
                </Text>
              </div>

              <div>
                <div style={{ display: "flex", gap: 10 }}>
                  <input type={"checkbox"}></input>
                  <Text variant="headingMd">ReplyBot</Text>
                </div>
                <Text variant="bodySm">
                  Harness the power of ChatGPT to automatically suggest a review
                  reply and build instant, deep loyalty with customers
                </Text>
              </div>

              <div>
                <div style={{ display: "flex", gap: 10 }}>
                  <input type={"checkbox"}></input>
                  <Text variant="headingMd">Send Reply Notifications</Text>
                </div>
                <Text variant="bodySm">
                  Send notification to customer when store owner replies to
                  their review or question
                </Text>
              </div>
              <div style={{ width: "70px" }}>
                <Button>Save</Button>
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
