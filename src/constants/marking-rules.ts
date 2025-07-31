import { type MarkingRule } from "../types/extensions";

export const MarkingRules: MarkingRule[] = [
	{
		markType: "italic",
		regex: [
			{ source: /(^|\s)_([^\s_]+)_(?=\s|$)/g, symbol: "_" },
			{ source: /(^|\s)\*([^\s\*]+)\*(?=\s|$)/g, symbol: "*" },
		],
		offsetStart: 1,
		offsetEnd: -1,
	},
	{
		markType: "bold",
		regex: [
			{ source: /(^|\s)__([^\s_]+)__(?=\s|$)/g, symbol: "__" },
			{ source: /(^|\s)\*\*([^\s\*]+)\*\*(?=\s|$)/g, symbol: "**" },
		],
		offsetStart: 1,
		offsetEnd: -2,
	},
	{
		markType: "strike",
		regex: [{ source: /(^|\s)~~([^\s~]+)~~(?=\s|$)/g, symbol: "~~" }],
		offsetStart: 1,
		offsetEnd: -2,
	},
	{
		markType: "code",
		regex: [{ source: /(^|\s)`([^`]+)`(?=\s|$)/g, symbol: "`" }],
		offsetStart: 1,
		offsetEnd: -1,
	},
];
