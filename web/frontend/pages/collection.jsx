import {
  Page,
  Layout,
  LegacyCard,
  EmptyState,
  Autocomplete,
  Icon,
  Button,
  DataTable,
  Spinner,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useState, useCallback } from "react";
import Input from "../components/shared/Input";
import { SearchMinor } from "@shopify/polaris-icons";
import Rating from "../components/shared/Rating";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export default function ReviewCollection() {
  const { t } = useTranslation();
  const fetch = useAuthenticatedFetch();
  const [isNewRequestFormOpen, setIsNewRequestFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState();
  const [creatingRequest, setCreatingRequest] = useState(false);

  //Fetch Products
  const { data: products, isLoading: isLoading } = useAppQuery({
    url: "/api/products/",
    reactQueryOptions: {
      onSuccess: ({ data: productsData }) => {
        setOptions(
          productsData.map((product) => {
            return { value: product.id, label: product.title };
          })
        );
      },
    },
  });

  //All reviews
  const {
    data: reviewRequests,
    isLoading: loadingReviews,
    refetch: refetchRequests,
  } = useAppQuery({
    url: "/api/reviews/",
    reactQueryOptions: {
      onSuccess: ({ data }) => {},
    },
  });

  const updateText = useCallback((value) => {
    setInputValue(value);

    if (value === "") {
      setOptions(
        products &&
          products.data &&
          products.data.map((product) => {
            return { value: product.title, label: product.title };
          })
      );
      return;
    }
  }, []);

  const updateSelection = useCallback(
    (selected) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return selectedItem === option.value;
        });
        setInputValue(matchedOption.label || "");
        return matchedOption && matchedOption.value;
      });

      setSelectedOptions(selected);
    },
    [options]
  );

  const handleSendReviewRequest = async () => {
    setCreatingRequest(true);
    const response = await fetch(
      `/api/review/create?name=${name}&email=${email}&productId=${selectedOptions[0]}`
    );

    if (response.ok) {
      await refetchRequests();
    }
    setCreatingRequest(false);
  };

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
                {!isLoading && (
                  <Autocomplete
                    options={options}
                    selected={selectedOptions}
                    onSelect={updateSelection}
                    textField={textField}
                  />
                )}
                <div style={{ display: "flex", gap: 10, paddingTop: 20 }}>
                  <Button
                    variant="tertiary"
                    loading={creatingRequest}
                    disabled={creatingRequest}
                    onClick={handleSendReviewRequest}
                  >
                    Send
                  </Button>
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
        ) : loadingReviews ? (
          <Layout.Section>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Spinner accessibilityLabel="Spinner example" size="large" />
            </div>
          </Layout.Section>
        ) : !reviewRequests ||
          (reviewRequests && reviewRequests.length === 0) ? (
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
                rows={reviewRequests.map((reviewRequest) => {
                  //To change after api is complete
                  return [
                    reviewRequest.product,
                    reviewRequest.name,
                    reviewRequest.email,
                    <Rating value={reviewRequest.rating} />,
                  ];
                })}
                footerContent={`Showing ${reviewRequests.length} of ${reviewRequests.length} results`}
              />
            </LegacyCard>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
}
