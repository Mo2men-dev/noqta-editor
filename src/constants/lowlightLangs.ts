import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import c from "highlight.js/lib/languages/c";
import java from "highlight.js/lib/languages/java";
import cpp from "highlight.js/lib/languages/cpp";
import kotlin from "highlight.js/lib/languages/kotlin";
import python from "highlight.js/lib/languages/python";
import ruby from "highlight.js/lib/languages/ruby";
import rust from "highlight.js/lib/languages/rust";
import plaintext from "highlight.js/lib/languages/plaintext";
import type { LanguageFn } from "highlight.js";

export const lowlightLangs = [
	["plaintext", plaintext],
	["css", css],
	["javascript", js],
	["typescript", ts],
	["xml", html],
	["c", c],
	["java", java],
	["cpp", cpp],
	["kotlin", kotlin],
	["python", python],
	["ruby", ruby],
	["rust", rust],
] as [string, LanguageFn][];
