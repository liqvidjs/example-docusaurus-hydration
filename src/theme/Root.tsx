import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// Default implementation, that you can customize
export default function Root({ children }: {
  children: React.ReactNode;
}) {
	const { siteConfig } = useDocusaurusContext();
	return (
		<>
			<script
				id="__docusaurus-prism-config"
				type="application/json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(siteConfig.themeConfig.prism),
				}}
			/>
			{children}
		</>
	);
}
