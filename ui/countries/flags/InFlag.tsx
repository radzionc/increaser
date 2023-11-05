// This file is generated by @increaser/ui/country/codegen/generateFlags.ts
import { SvgIconProps } from '@increaser/ui/icons/SvgIconProps'

const InFlag = (props: SvgIconProps) => (
  <svg
    {...props}
    width="1em"
    height="0.75em"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    id="flag-icons-in"
    viewBox="0 0 640 480"
    {...props}
  >
    <path fill="#f93" d="M0 0h640v160H0z" />
    <path fill="#fff" d="M0 160h640v160H0z" />
    <path fill="#128807" d="M0 320h640v160H0z" />
    <g transform="matrix(3.2 0 0 3.2 320 240)">
      <circle r={20} fill="#008" />
      <circle r={17.5} fill="#fff" />
      <circle r={3.5} fill="#008" />
      <g id="in-d">
        <g id="in-c">
          <g id="in-b">
            <g id="in-a" fill="#008">
              <circle r={0.9} transform="rotate(7.5 -8.8 133.5)" />
              <path d="M0 17.5.6 7 0 2l-.6 5L0 17.5z" />
            </g>
            <use xlinkHref="#in-a" transform="rotate(15)" />
          </g>
          <use xlinkHref="#in-b" transform="rotate(30)" />
        </g>
        <use xlinkHref="#in-c" transform="rotate(60)" />
      </g>
      <use xlinkHref="#in-d" transform="rotate(120)" />
      <use xlinkHref="#in-d" transform="rotate(-120)" />
    </g>
  </svg>
)

export default InFlag
