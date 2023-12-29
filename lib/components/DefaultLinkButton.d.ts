import { ReactElement, MouseEvent } from 'react';
import { LinkButtonTheme } from './LinkButton';
export interface DefaultLinkButtonProps {
    hasLinkSelected: boolean;
    onRemoveLinkAtSelection(): void;
    onAddLinkClick(event: MouseEvent): void;
    theme?: LinkButtonTheme;
}
export default function DefaultLinkButton({ hasLinkSelected, onRemoveLinkAtSelection, onAddLinkClick, theme, }: DefaultLinkButtonProps): ReactElement;
