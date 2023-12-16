import { starImage, starFilledImage } from "../../assets";
export default function Rating({ value }) {
  return (
    <div>
      {value >= 1 ? (
        <img width={20} height={20} src={starFilledImage} />
      ) : (
        <img width={20} height={20} src={starImage} />
      )}
      {value >= 2 ? (
        <img width={20} height={20} src={starFilledImage} />
      ) : (
        <img width={20} height={20} src={starImage} />
      )}
      {value >= 3 ? (
        <img width={20} height={20} src={starFilledImage} />
      ) : (
        <img width={20} height={20} src={starImage} />
      )}
      {value >= 4 ? (
        <img width={20} height={20} src={starFilledImage} />
      ) : (
        <img width={20} height={20} src={starImage} />
      )}
      {value >= 5 ? (
        <img width={20} height={20} src={starFilledImage} />
      ) : (
        <img width={20} height={20} src={starImage} />
      )}
    </div>
  );
}
