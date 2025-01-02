import type { FC } from 'hono/jsx';

type ProfileProps = {
  name: string;
  links: {
    title: string;
    url: string;
  }[];
};

export const Profile: FC<ProfileProps> = ({ name, links }) => (
  <section class="profile">
    <div class="profile-header">
      <h2 class="profile-name">{name}</h2>
      <ul class="profile-list">
        {links.map((link) => (
          <li class="profile-list-item" key={link.url}>
            <a href={link.url} class="profile-list-link" target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
