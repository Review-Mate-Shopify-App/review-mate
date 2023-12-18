import { LegacyCard, Button, Tag, Avatar } from "@shopify/polaris";
import Rating from "./shared/Rating";
import Input from "./shared/Input";
import { useState } from "react";
import { useAuthenticatedFetch } from "../hooks";

export default function ReviewCard({ row }) {
  const fetch = useAuthenticatedFetch();

  const [replying, setReplying] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [reviewReply, setReviewReply] = useState("");

  const handlePublishClick = async (id) => {
    setPublishing(true);
    const response = await fetch(`/api/review/publish?reviewId=${id}`);

    if (response.ok) {
      setPublishing(false);
    }
  };

  const handleReplyReview = async (id, reviewReply) => {
    setReplying(true);
    const response = await fetch(
      `/api/review/createReply?reviewId=${id}&ratingMessageReply=${reviewReply}`
    );

    if (response.ok) {
      setReplying(false);
    }
  };

  return (
    <LegacyCard
      title={
        <div style={{ display: "flex", gap: 12 }}>
          <Rating value={row.ratingStar} />
          <span style={{ fontSize: "14px", fontWeight: "bold" }}>
            {row.productName}
          </span>
        </div>
      }
      key={row.id}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "20px",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Avatar initials={row.name[0]} size="small" />
            <span style={{ fontWeight: "bold", fontSize: "14px" }}>
              {row.name}
            </span>
            | <Tag>Product</Tag>
            <span>{"|  December 17, 2023"}</span>
          </div>
          {row.isPublished ? (
            <span
              style={{
                color: "green",
                fontWeight: "bold",
                justifySelf: "end",
              }}
            >
              ✅ Published
            </span>
          ) : (
            <Button
              loading={publishing}
              disabled={publishing}
              onClick={() => handlePublishClick(row.id)}
            >
              Publish
            </Button>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>{row.ratingMessage}</span>
          <span style={{ color: "blue" }}>{row.email}</span>
        </div>
        {row.ratingMessageReply ? (
          <div
            style={{
              backgroundColor: "#F1F2F4",
              padding: "10px",
              borderRadius: "12px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Reply:</span>
            <div>{row.ratingMessageReply}</div>
          </div>
        ) : (
          <>
            <Input
              multiline={2}
              value={reviewReply}
              onChange={(value) => setReviewReply(value)}
              autoComplete={"off"}
              placeholder={"Reply to the review..."}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Button
                loading={replying}
                disabled={replying}
                onClick={() => handleReplyReview(row.id, reviewReply)}
              >
                Reply
              </Button>
              <div style={{ width: "260px" }}>
                <Button disabled={true}>
                  ChatGPT Reply &nbsp;<Tag>Coming Soon</Tag>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </LegacyCard>
  );
}
