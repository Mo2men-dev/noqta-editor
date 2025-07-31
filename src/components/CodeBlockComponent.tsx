import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

/**
 * CodeBlockComponent is a React component that renders a code block with a language selector.
 */
const CodeBlockComponent = ({
	node: {
		attrs: { language: defaultLanguage },
	},
	updateAttributes,
	extension,
}: any) => (
	<NodeViewWrapper className="code-block">
		<select
			contentEditable={false}
			defaultValue={defaultLanguage}
			onChange={(event) => updateAttributes({ language: event.target.value })}>
			<option value="null">auto</option>
			<option disabled>—</option>
			{extension.options.langs.map((lang: string, index: number) => (
				<option key={index} value={lang}>
					{lang.charAt(0).toUpperCase() + lang.slice(1)}
				</option>
			))}
		</select>
		<pre>
			{/* @ts-ignore */}
			<NodeViewContent as="code" />
		</pre>
	</NodeViewWrapper>
);

export default CodeBlockComponent;
