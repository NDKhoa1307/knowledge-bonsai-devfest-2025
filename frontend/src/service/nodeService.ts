import type { NodeInfoResponse } from "@/types/NodeInfoTypes";
import { api } from "./api";

export interface NodeInfoExtractedResponse {
  content: string; // This should and can be in markdown format
  links: string[]; // Put this in a reference section
}

const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
const nodeContextLinkExtractor = (content: string): string[] => {
  const links: string[] = [];
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    links.push(match[2]);
  }
  return links;
}


export const nodeService = {
  // Get node information by ID
  getNodeInfo: async (treeId: string, nodeId: string): Promise<NodeInfoExtractedResponse | null> => {
    try {
      const response = await api.post<string>(`trees/${treeId}/nodes/${nodeId}`);
      if (response.data) {
        const links = nodeContextLinkExtractor(response.data);
        return {
          content: response.data,
          links: links,
        }
      }
      return null;
      // await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      // return {
      //   content: sampleMarkdown,
      //   links: nodeContextLinkExtractor(sampleMarkdown),
      // };
    } catch (error) {
      console.error('Error fetching node info:', error);
      return null;
    }
  }
}


const sampleMarkdown = `
# Frontend Development Overview

Frontend development focuses on building the parts of a website that users directly see and interact with.

## Core Technologies

- **HTML** – structure of the webpage  
  Learn more here: [HTML MDN](https://developer.mozilla.org/en-US/docs/Web/HTML)

- **CSS** – styling and layout  
  Useful reference: [CSS Tricks](https://css-tricks.com/)

- **JavaScript** – interactivity and logic  
  Official docs: [JavaScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Modern Frontend Ecosystem

### Frameworks & Libraries

- **React** – component-based UI library  
  Docs: [React Official Docs](https://react.dev/)

- **Vue.js** – progressive framework  
  Docs: [Vue.js Guide](https://vuejs.org/guide/introduction.html)

- **Angular** – full frontend framework  
  Docs: [Angular Documentation](https://angular.io/docs)

### Styling Solutions

- Utility-first CSS: [TailwindCSS](https://tailwindcss.com/)
- Component libraries: [Ant Design](https://ant.design/)
- Responsive UI guide: [Bootstrap](https://getbootstrap.com/)

## Essential Tools

- Package managers: [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- Bundlers: [Vite](https://vitejs.dev/) or [Webpack](https://webpack.js.org/)
- Linters: [ESLint](https://eslint.org/)
- Formatters: [Prettier](https://prettier.io/)

## API Communication

- REST example: [REST API Guide](https://www.restapitutorial.com/)
- GraphQL intro: [GraphQL Documentation](https://graphql.org/learn/)

## UI/UX Considerations

- Accessibility: [WAI WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)
- UI Patterns: [UI Patterns Library](https://ui-patterns.com/)
`
