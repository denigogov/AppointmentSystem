import { useInView } from "react-intersection-observer";

interface LazyLoadingImageProps {
  source: string | { default: string };
  alt: string;
  id: string;
}

const LazyLoadingImage: React.FC<LazyLoadingImageProps> = ({
  source,
  alt,
  id,
}) => {
  const { ref, inView } = useInView();

  return inView ? (
    <img src={typeof source === "string" ? source : source.default} alt={alt} />
  ) : (
    <img
      ref={ref}
      id={id.toString()}
      style={{
        backgroundColor: "#e6e0e0",
        filter: "blur(8px)",
      }}
    />
  );
};

export default LazyLoadingImage;
