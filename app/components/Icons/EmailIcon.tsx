import { LinkType } from "@/types/linkType";

export default function EmailIcon({
  link,
  width,
  height,
}: {
  link: LinkType;
  width: string;
  height: string;
}) {
  return (
    <a href={link.path} target={"_" + link.target}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={"0 0 " + width + " " + height}
        className="fill-current"
      >
        <path d="M0 3v18h24v-18h-24zm22 16l-6.526-6.618-3.445 3.483-3.418-3.525-6.611 6.66 5.051-8-5.051-6 10.029 7.446 9.971-7.446-4.998 6.01 4.998 7.99z" />
      </svg>
    </a>
  );
}
