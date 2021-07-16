import React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import NextLink from "next/link";
import MuiLink from "@material-ui/core/Link";

interface NextComposedProps {
  href: string | Record<string, unknown>;
  prefetch?: boolean;
  className?: string;
}

const NextComposed = React.forwardRef(function NextComposed(
  props: NextComposedProps,
  ref: React.LegacyRef<HTMLAnchorElement>,
) {
  const { href, ...other } = props;

  return (
    <NextLink href={href}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

interface LinkProps {
  activeClassName?: string;
  className?: string;
  href: string | (string & { pathname?: string });
  innerRef?: () => void | Record<string, unknown>;
  onClick?: () => void;
  naked?: boolean;
  prefetch?: boolean;
  children?: React.ReactNode;
  color?:
    | "inherit"
    | "initial"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | "error";
  noDec?: boolean;
  target?: string;
  style?: React.CSSProperties;
}

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props: LinkProps): React.ReactElement {
  const {
    href,
    activeClassName = "active",
    className: classNameProps,
    innerRef,
    naked,
    color = "inherit",
    noDec = false,
    target = "_self",
    style = {},
    ...others
  } = props;

  const router = useRouter();
  // @ts-ignore
  const pathname = typeof href === "string" ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  if (noDec) {
    style.textDecoration = "none";
  }

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={innerRef}
        href={href}
        {...others}
      />
    );
  }

  return (
    <MuiLink
      style={style}
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href}
      color={color}
      target={target}
      {...others}
    />
  );
}

// @ts-ignore
export default React.forwardRef(
  (props: LinkProps, ref: () => void | Record<string, unknown>) => (
    <Link {...props} innerRef={ref} />
  ),
);
