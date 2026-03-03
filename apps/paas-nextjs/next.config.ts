import type { NextConfig } from "next";

import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

const nextConfig: NextConfig = {
	/* config options here */
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
	reactCompiler: true,
};

export default withMDX(nextConfig);
