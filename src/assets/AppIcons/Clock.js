import React from 'react';

const ClockIcon = props => (
  <svg width={60} height={60} {...props}>
    <title>{'Clock'}</title>
    <defs>
      <path
        d="M60 41.316c0 .713 0 1.427-.004 2.14-.003.602-.01 1.202-.027 1.803-.036 1.307-.114 2.629-.35 3.922-.238 1.314-.627 2.537-1.243 3.73a12.537 12.537 0 01-2.333 3.176 12.68 12.68 0 01-3.213 2.308c-1.207.607-2.443.993-3.772 1.229-1.31.232-2.645.31-3.969.345-2.545.031-3.266.031-3.988.031H18.9c-2.773-.008-3.38-.014-3.988-.031-1.324-.035-2.66-.113-3.969-.345-1.329-.236-2.565-.622-3.772-1.23a12.661 12.661 0 01-3.213-2.307 12.566 12.566 0 01-2.334-3.175C1.009 51.718.62 50.495.381 49.18c-.236-1.293-.313-2.615-.349-3.922-.016-.6-.024-1.201-.027-1.802C0 42.743 0 42.029 0 41.316V18.684c0-.713 0-1.428.005-2.14.003-.602.01-1.202.027-1.803.036-1.308.113-2.629.349-3.923.24-1.314.628-2.536 1.243-3.73a12.636 12.636 0 015.547-5.483C8.378.998 9.614.612 10.943.376c1.31-.232 2.645-.31 3.969-.345C17.457 0 18.178 0 18.9 0h21.609l-7.697.003L41.102 0c2.771.008 3.379.014 3.987.031 1.324.035 2.66.113 3.969.345 1.329.236 2.565.622 3.772 1.23a12.655 12.655 0 013.213 2.307c.941.93 1.73 2.002 2.333 3.175.616 1.194 1.005 2.416 1.243 3.73.236 1.294.314 2.615.35 3.923.016.6.024 1.201.027 1.803.004.712.004 1.427.004 2.14v22.632z"
        id="prefix__a"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="prefix__b" fill="#fff">
        <use xlinkHref="#prefix__a" />
      </mask>
      <use fill="#202021" xlinkHref="#prefix__a" />
      <circle fill="#F6F5F8" mask="url(#prefix__b)" cx={30} cy={30} r={26} />
      <g
        mask="url(#prefix__b)"
        fontFamily="SFProText-Semibold, SF Pro Text"
        fontSize={7}
        fontWeight={500}
      >
        <text transform="translate(5.5 4)">
          <tspan x={33.764} y={11} fill="#000">
            {'1'}
          </tspan>
        </text>
        <text transform="translate(5.5 4)">
          <tspan x={41.297} y={18.5} fill="#000">
            {'2'}
          </tspan>
        </text>
        <text transform="translate(5.5 4)">
          <tspan x={43.712} y={29} fill="#000">
            {'3'}
          </tspan>
        </text>
        <text transform="translate(5.5 4)">
          <tspan x={40.647} y={39.5} fill="#000">
            {'4'}
          </tspan>
        </text>
        <text transform="translate(5.5 4)">
          <tspan x={32.734} y={47} fill="#000">
            {'5'}
          </tspan>
        </text>
        <text transform="translate(5.5 4)">
          <tspan x={22.166} y={50} fill="#000">
            {'6'}
          </tspan>
        </text>
        <text transform="translate(5.5 4)">
          <tspan x={11.927} y={47} fill="#000">
            {'7'}
          </tspan>
        </text>
        <text transform="translate(5.5 4)">
          <tspan x={3.642} y={39.5} fill="#000">
            {'8'}
          </tspan>
        </text>
        <text transform="translate(5.5 4)">
          <tspan x={0.166} y={29} fill="#000">
            {'9'}
          </tspan>
        </text>
        <text transform="translate(5.5 4)">
          <tspan x={2.438} y={19} fill="#000">
            {'10'}
          </tspan>
        </text>
        <text transform="translate(5.5 4)">
          <tspan x={10.527} y={11} fill="#000">
            {'11'}
          </tspan>
        </text>
        <text transform="translate(5.5 4)">
          <tspan x={20.561} y={7.5} fill="#000">
            {'12'}
          </tspan>
        </text>
      </g>
      <rect
        fill="#000"
        mask="url(#prefix__b)"
        x={29.5}
        y={6}
        width={1}
        height={24}
        rx={0.5}
      />
      <path
        d="M30 6.975a.25.25 0 01.25.25v26.5a.25.25 0 11-.5 0v-26.5a.25.25 0 01.25-.25z"
        fill="#FE9124"
        mask="url(#prefix__b)"
        transform={{rotate: "30, 30, 30"}}
      />
      <rect
        fill="#000"
        mask="url(#prefix__b)"
        x={29.5}
        y={14}
        width={1}
        height={16}
        rx={0.5}
      />
      <circle fill="#000" mask="url(#prefix__b)" cx={30} cy={30} r={1.5} />
    </g>
  </svg>
)


export default ClockIcon;
