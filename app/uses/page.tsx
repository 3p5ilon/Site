import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description: "Things I use!",
};

export default function Uses() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Uses</h1>

      <div className="prose prose-neutral dark:prose-invert">

        <h2>Core</h2>
        <ul>
          <li>Laptop: <a href="https://www.apple.com/macbook-air-m1/" target="_blank" rel="noopener noreferrer">MacBook Air M1</a></li>
          <li>OS: <a href="https://www.apple.com/macos/" target="_blank" rel="noopener noreferrer">macOS</a> | <a href="https://ubuntu.com/" target="_blank" rel="noopener noreferrer">Ubuntu</a></li>
          <li>terminal: <a href="https://ghostty.org/" target="_blank" rel="noopener noreferrer">Ghostty</a> | <a href="https://sw.kovidgoyal.net/kitty/" target="_blank" rel="noopener noreferrer">kitty</a></li>
          <li>Shell: <a href="https://www.zsh.org/" target="_blank" rel="noopener noreferrer">zsh</a></li>
          <li>Editor: <a href="https://neovim.io/" target="_blank" rel="noopener noreferrer">Neovim</a> | <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">VS Code</a></li>
          <li>File Manager: <a href="https://github.com/sxyazi/yazi" target="_blank" rel="noopener noreferrer">Yazi</a></li>
          <li>Browser: <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">Chrome</a> | <a href="https://www.mozilla.org/firefox/" target="_blank" rel="noopener noreferrer">Firefox</a></li>
          <li>Colorscheme: <a href="https://github.com/catppuccin/catppuccin" target="_blank" rel="noopener noreferrer">Catppuccin</a></li>
          <li>Font: <a href="https://www.jetbrains.com/lp/mono/" target="_blank" rel="noopener noreferrer">JetBrains Mono</a></li>
        </ul>

        <h2>CLI</h2>
        <ul>
          <li>Multiplexer: <a href="https://github.com/tmux/tmux" target="_blank" rel="noopener noreferrer">tmux</a></li>
          <li>Prompt: <a href="https://starship.rs/" target="_blank" rel="noopener noreferrer">starship</a></li>
          <li>Fuzzy Finder: <a href="https://github.com/junegunn/fzf" target="_blank" rel="noopener noreferrer">fzf</a></li>
          <li>Git UI: <a href="https://github.com/jesseduffield/lazygit" target="_blank" rel="noopener noreferrer">lazygit</a></li>
          <li>System Monitor: <a href="https://github.com/aristocratos/btop" target="_blank" rel="noopener noreferrer">btop</a></li>
          <li>Fetch: <a href="https://github.com/fastfetch-cli/fastfetch" target="_blank" rel="noopener noreferrer">fastfetch</a></li>
          <li>Dotfiles: <a href="https://www.gnu.org/software/stow/" target="_blank" rel="noopener noreferrer">stow</a></li>
          <li>Containers: <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">docker</a></li>
        </ul>

        <h3>Core Utils</h3>
        <ul>
          <li>cd: <a href="https://github.com/ajeetdsouza/zoxide" target="_blank" rel="noopener noreferrer">zoxide</a></li>
          <li>grep: <a href="https://github.com/BurntSushi/ripgrep" target="_blank" rel="noopener noreferrer">ripgrep</a></li>
          <li>find: <a href="https://github.com/sharkdp/fd" target="_blank" rel="noopener noreferrer">fd</a></li>
          <li>cat: <a href="https://github.com/sharkdp/bat" target="_blank" rel="noopener noreferrer">bat</a></li>
          <li>ls: <a href="https://github.com/eza-community/eza" target="_blank" rel="noopener noreferrer">eza</a></li>
          <li>man: <a href="https://tldr.sh/" target="_blank" rel="noopener noreferrer">tldr</a></li>
        </ul>

        <h2>GUI</h2>
        <ul>
          <li>Music: <a href="https://www.spotify.com/" target="_blank" rel="noopener noreferrer">Spotify</a></li>
          <li>Messaging: <a href="https://discord.com/" target="_blank" rel="noopener noreferrer">Discord</a> | <a href="https://telegram.org/" target="_blank" rel="noopener noreferrer">Telegram</a></li>
          <li>Notes: <a href="https://obsidian.md/" target="_blank" rel="noopener noreferrer">Obsidian</a></li>
        </ul>

        <h2>Utilities</h2>
        <ul>
          <li>VPN: <a href="https://protonvpn.com/" target="_blank" rel="noopener noreferrer">ProtonVPN</a></li>
          <li>Torrent: <a href="https://www.qbittorrent.org/" target="_blank" rel="noopener noreferrer">qBittorrent</a></li>
          <li>Archiver: <a href="https://www.7-zip.org/" target="_blank" rel="noopener noreferrer">7-Zip</a></li>
        </ul>

        <h2>Browser Extensions</h2>
        <ul>
          <li>Password Manager: <a href="https://bitwarden.com/" target="_blank" rel="noopener noreferrer">Bitwarden</a></li>
          <li>Ad Blocker: <a href="https://ublockorigin.com/" target="_blank" rel="noopener noreferrer">uBlock Origin</a></li>
        </ul>

      </div>
    </section>
  );
}