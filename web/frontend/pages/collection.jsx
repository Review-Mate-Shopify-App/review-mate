import {
  Page,
  Layout,
  LegacyCard,
  EmptyState,
  Autocomplete,
  Icon,
  Button,
  DataTable,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useState, useCallback, useMemo } from "react";
import Input from "../components/shared/Input";
import { SearchMinor } from "@shopify/polaris-icons";
import Rating from "../components/shared/Rating";

const rows = [
  ["Emerald Silk Gown", "Shreya", "shreyam@gluelabs.com", <Rating value={4} />],
  ["Mauve Cashmere Scarf", "Amit", "amit@gluelabs.com", <Rating value={3} />],
];

export default function ReviewCollection() {
  const deselectedOptions = useMemo(
    () => [
      { value: "rustic", label: "Rustic" },
      { value: "antique", label: "Antique" },
      { value: "vinyl", label: "Vinyl" },
      { value: "vintage", label: "Vintage" },
      { value: "refurbished", label: "Refurbished" },
    ],
    []
  );

  const { t } = useTranslation();
  const [isNewRequestFormOpen, setIsNewRequestFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions]
  );

  const updateSelection = useCallback(
    (selected) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue[0] || "");
    },
    [options]
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label={
        <label style={{ fontWeight: "bold", fontSize: "14px" }}>
          Select Product
        </label>
      }
      value={inputValue}
      prefix={<Icon source={SearchMinor} tone="base" />}
      placeholder="Search"
      autoComplete="off"
    />
  );

  return (
    <Page fullWidth>
      <TitleBar
        title={
          isNewRequestFormOpen
            ? "New Review Request"
            : t("ReviewCollection.title")
        }
        primaryAction={{
          content: t("ReviewCollection.newReviewRequest"),
          onAction: () => setIsNewRequestFormOpen(true),
        }}
      />
      <Layout>
        {isNewRequestFormOpen ? (
          <Layout.Section>
            <LegacyCard sectioned>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 30,
                  padding: 20,
                  width: "450px",
                }}
              >
                <Input
                  value={name}
                  label={"Customer Name"}
                  autoComplete={"off"}
                  onChange={(e) => setName(e)}
                />
                <Input
                  value={email}
                  type="email"
                  label="Customer email"
                  onChange={(e) => setEmail(e)}
                  autoComplete="email"
                />
                <Autocomplete
                  options={options}
                  selected={selectedOptions}
                  onSelect={updateSelection}
                  textField={textField}
                />
                <div style={{ display: "flex", gap: 10, paddingTop: 20 }}>
                  <Button variant="tertiary">Send</Button>
                  <Button
                    onClick={() => {
                      setIsNewRequestFormOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </LegacyCard>
          </Layout.Section>
        ) : rows.length === 0 ? (
          <Layout.Section>
            <LegacyCard sectioned>
              <EmptyState
                heading="No Review Requests"
                action={{
                  content: "New Request",
                  onAction: () => setIsNewRequestFormOpen(true),
                }}
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <p>
                  Your review requests will show up here. You can send review
                  email, view reviews, send review replies and publish your
                  reviews here.
                </p>
              </EmptyState>
            </LegacyCard>
          </Layout.Section>
        ) : (
          <Layout.Section>
            <LegacyCard>
              <DataTable
                columnContentTypes={["text", "text", "text", "numeric"]}
                headings={[
                  <div style={{ fontWeight: "bold" }}>Products</div>,
                  <span style={{ fontWeight: "bold" }}>Customer Name</span>,
                  <span style={{ fontWeight: "bold" }}>Customer Email</span>,
                  <span style={{ fontWeight: "bold" }}>Rating</span>,
                ]}
                rows={rows}
                footerContent={`Showing ${rows.length} of ${rows.length} results`}
              />
            </LegacyCard>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
}
